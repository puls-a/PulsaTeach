param([switch]$Enable)
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '../..')).Path
$node = (Get-Command node).Source
if (-not $Enable) { throw 'Relancer avec -Enable après connexion et vérification du compte Meta.' }
$action = New-ScheduledTaskAction -Execute $node -Argument 'social/instagram/cli.mjs run' -WorkingDirectory $root
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) -RepetitionInterval (New-TimeSpan -Minutes 5)
$settings = New-ScheduledTaskSettingsSet -MultipleInstances IgnoreNew -StartWhenAvailable
Register-ScheduledTask -TaskName 'PulsaTeach-Instagram' -Action $action -Trigger $trigger -Settings $settings -Description 'Publication des Reels via API officielle Meta ; état persistant local.'
