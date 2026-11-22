param(
  [string]$Branch = 'main'
)

$ErrorActionPreference = 'Stop'
$token = $env:GH_TOKEN
if (-not $token) { throw 'Missing GH_TOKEN.' }

$owner = 'Ti-68281'
$repo = 'Bamboo-Launcher'
$root = Split-Path -Parent $PSScriptRoot
$api = "https://api.github.com/repos/$owner/$repo"
$headers = @{
  Authorization = "Bearer $token"
  Accept = 'application/vnd.github+json'
  'User-Agent' = 'Bamboo-Launcher-Publisher'
  'X-GitHub-Api-Version' = '2022-11-28'
}

function Invoke-GitHub {
  param(
    [string]$Uri,
    [string]$Method = 'GET',
    $Body = $null
  )
  $params = @{
    Uri = $Uri
    Method = $Method
    Headers = $headers
    TimeoutSec = 120
  }
  if ($null -ne $Body) {
    $params.ContentType = 'application/json; charset=utf-8'
    $params.Body = ($Body | ConvertTo-Json -Depth 30 -Compress)
  }
  Invoke-RestMethod @params
}

$excludedDirs = @('.git', '.tools', '.pnpm-store', 'node_modules', 'out', 'release', 'docs/evidence', '.pack')
$excludedFiles = @(
  '.site-home.html',
  '.github-tree.json',
  '.github-device.json',
  '.github-token',
  '.curlrc-bamboo',
  '.release-upload-url.txt'
)

function Should-Include([string]$relative) {
  $normalized = $relative -replace '\\', '/'
  if ($excludedFiles -contains $normalized) { return $false }
  if ($normalized -like '*.log') { return $false }
  foreach ($dir in $excludedDirs) {
    if ($normalized -eq $dir -or $normalized.StartsWith("$dir/")) { return $false }
  }
  return $true
}

$files = Get-ChildItem -LiteralPath $root -Recurse -File | ForEach-Object {
  $relative = $_.FullName.Substring($root.Length + 1) -replace '\\', '/'
  if (Should-Include $relative) {
    [PSCustomObject]@{ FullName = $_.FullName; Relative = $relative }
  }
}
Write-Host "publishing $($files.Count) files to $owner/$repo@$Branch"

$ref = Invoke-GitHub -Uri "$api/git/ref/heads/$Branch"
$baseCommit = Invoke-GitHub -Uri "$api/git/commits/$($ref.object.sha)"
$tree = New-Object System.Collections.Generic.List[object]
$index = 0

foreach ($file in $files) {
  $base64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($file.FullName))
  $blob = Invoke-GitHub -Uri "$api/git/blobs" -Method 'POST' -Body @{
    content = $base64
    encoding = 'base64'
  }
  $tree.Add([PSCustomObject]@{
    path = $file.Relative
    mode = '100644'
    type = 'blob'
    sha = $blob.sha
  })
  $index++
  if ($index % 20 -eq 0 -or $index -eq $files.Count) {
    Write-Host "  blobs $index/$($files.Count)"
  }
}

$newTree = Invoke-GitHub -Uri "$api/git/trees" -Method 'POST' -Body @{
  base_tree = $baseCommit.tree.sha
  tree = $tree.ToArray()
}
$commit = Invoke-GitHub -Uri "$api/git/commits" -Method 'POST' -Body @{
  message = 'Release Bamboo Launcher v1.0.1'
  tree = $newTree.sha
  parents = @($ref.object.sha)
}
Invoke-GitHub -Uri "$api/git/refs/heads/$Branch" -Method 'PATCH' -Body @{
  sha = $commit.sha
  force = $false
} | Out-Null

Write-Host "published $($commit.html_url)"
