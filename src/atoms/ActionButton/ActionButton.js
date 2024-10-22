import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './ActionButton.css'


export default function ActionButton({iconButton,content}) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      className="action-button"
      startIcon={iconButton}
    >
    {content}
    </Button>
  );
}
