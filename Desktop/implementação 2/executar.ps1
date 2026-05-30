$ErrorActionPreference = "Stop"

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
chcp 65001 | Out-Null

$raiz = $PSScriptRoot
$src = Join-Path $raiz "src\main\java"
$out = Join-Path $raiz "out"

New-Item -ItemType Directory -Force -Path $out | Out-Null

$arquivos = Get-ChildItem -Recurse -Filter *.java $src | ForEach-Object { $_.FullName }
javac -encoding UTF-8 -d $out @arquivos

$argumentos = $args -join " "
java "-Dfile.encoding=UTF-8" -cp $out refeicao.Main $argumentos
