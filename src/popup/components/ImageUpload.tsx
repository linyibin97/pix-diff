import React, { useState, ChangeEvent } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/system'

interface ImageUploadProps {
  value?: string
  onChange?: (value: string, width: number, height: number) => void
}

const Input = styled('input')({
  display: 'none',
})

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          const img = new Image()
          img.onload = () => {
            onChange?.(reader.result as string, img.width, img.height)
          }
          img.src = reader.result as string
        }
        reader.readAsDataURL(file)
        setError(null) // Clear error if a valid file is selected
      } else {
        setError('请上传有效图片')
        // setError('Please upload a valid image file.')
      }
    }
  }

  return (
    <Box textAlign="center" mt={4} width={1}>
      <label htmlFor="upload-button">
        <Input accept="image/*" id="upload-button" type="file" onChange={handleImageUpload} />
        <Button variant="contained" component="span">
          上传图片
        </Button>
      </label>
      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
      {value && (
        <Box mt={2}>
          <img
            src={value as string}
            alt="Uploaded"
            style={{ maxHeight: '12rem', maxWidth: '12rem' }}
          />
        </Box>
      )}
    </Box>
  )
}

export default ImageUpload
