Add-Type -AssemblyName System.Drawing

$destDir = "$PWD\public\assets\products"
if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

$items = Get-Content "$PWD\all_packing_items.json" | ConvertFrom-Json
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatDescription -eq "JPEG" }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 94L)

Write-Host "Starting enhancement of $($items.Count) jewellery piece images..."
$stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
$count = 0

foreach ($item in $items) {
    $sr = $item.sr
    $itemNo = $item.itemNo.ToLower()
    $inputPath = "$PWD\extracted_xlsx\xl\media\image$($sr + 1).jpeg"
    $filename = ("cg-item-{0:D2}-{1}.jpg" -f $sr, $itemNo)
    $outputPath = Join-Path $destDir $filename

    if (!(Test-Path $inputPath)) {
        Write-Warning "Missing image: $inputPath"
        continue
    }

    $src = [System.Drawing.Bitmap]::FromFile($inputPath)
    $w = $src.Width
    $h = $src.Height

    # 1. Bounding box detection
    $minX = $w; $maxX = 0
    $minY = $h; $maxY = 0

    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $c = $src.GetPixel($x, $y)
            if ($c.R -lt 246 -or $c.G -lt 246 -or $c.B -lt 246) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }

    if ($minX -ge $maxX -or $minY -ge $maxY) {
        $minX = 0; $maxX = $w - 1
        $minY = 0; $maxY = $h - 1
    }

    $boxW = $maxX - $minX + 1
    $boxH = $maxY - $minY + 1
    $pad = [int]([Math]::Max($boxW, $boxH) * 0.12)
    $cropX = [Math]::Max(0, $minX - $pad)
    $cropY = [Math]::Max(0, $minY - $pad)
    $cropW = [Math]::Min($w - $cropX, $boxW + ($pad * 2))
    $cropH = [Math]::Min($h - $cropY, $boxH + ($pad * 2))

    $TargetSize = 800
    $dest = New-Object System.Drawing.Bitmap($TargetSize, $TargetSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.Clear([System.Drawing.Color]::White)

    $scale = ($TargetSize * 0.85) / [Math]::Max($cropW, $cropH)
    $drawW = [int]($cropW * $scale)
    $drawH = [int]($cropH * $scale)
    $drawX = [int](($TargetSize - $drawW) / 2)
    $drawY = [int](($TargetSize - $drawH) / 2)

    # Moderate contrast enhancement: 1.07
    $contrast = 1.07
    $t = (1.0 - $contrast) / 2.0
    $cm = New-Object System.Drawing.Imaging.ColorMatrix
    $cm.Matrix00 = $contrast
    $cm.Matrix11 = $contrast
    $cm.Matrix22 = $contrast
    $cm.Matrix33 = 1.0
    $cm.Matrix40 = $t
    $cm.Matrix41 = $t
    $cm.Matrix42 = $t

    $ia = New-Object System.Drawing.Imaging.ImageAttributes
    $ia.SetColorMatrix($cm)

    $srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
    $destRect = New-Object System.Drawing.Rectangle($drawX, $drawY, $drawW, $drawH)

    $g.DrawImage($src, $destRect, $srcRect.X, $srcRect.Y, $srcRect.Width, $srcRect.Height, [System.Drawing.GraphicsUnit]::Pixel, $ia)

    $dest.Save($outputPath, $encoder, $encParams)

    $g.Dispose()
    $dest.Dispose()
    $src.Dispose()
    $ia.Dispose()

    $count++
    if ($count % 10 -eq 0) {
        Write-Host "Processed $count / $($items.Count) images..."
    }
}

$stopwatch.Stop()
Write-Host "Enhanced all $count images in $($stopwatch.ElapsedMilliseconds) ms!"
