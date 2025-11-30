$svg = Get-Content 'icons/credit-card-together.svg' -Raw
$svg = $svg -replace '<svg ', '<svg class="how-it-works__single-img" '
$html = Get-Content 'index.html' -Raw
$html = $html -replace '(?s)<svg class="how-it-works__single-img".*?</svg>', $svg
Set-Content 'index.html' $html -NoNewline
Write-Output 'SVG replaced with together version!'
