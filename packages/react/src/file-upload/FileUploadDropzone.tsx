import type { ChangeEvent, DragEvent, KeyboardEvent } from 'react'

import { forwardRef, useRef, useState } from 'react'

export type FileUploadDropzoneProps = {
  /**
   * Callback for when files are dropped or selected
   */
  onFilesDrop?: (files: File[]) => void
}

export const FileUploadDropzone = forwardRef<HTMLDivElement, FileUploadDropzoneProps>(
  ({ onFilesDrop }, ref) => {
    const [isDragActive, setIsDragActive] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragActive(true)
    }

    const handleDragLeave = () => {
      setIsDragActive(false)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragActive(false)
      
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        if (onFilesDrop) {
          onFilesDrop(Array.from(e.dataTransfer.files))
        }
      }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        if (onFilesDrop) {
          onFilesDrop(Array.from(e.target.files))
        }
      }
    }

    const handleClick = () => {
      inputRef.current?.click()
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        inputRef.current?.click()
      }
    }

    return (
      <div
        aria-label="File upload area. Drop files here or click to select files."
        onClick={handleClick}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        ref={ref}
        role="button"
        style={{
          alignItems: 'center',
          border: `1px solid ${isDragActive ? 'var(--axiom-colors-border-accent)' : 'var(--axiom-colors-border-secondary)'}`,
          borderRadius: 'var(--axiom-radius-md)',
          cursor: 'pointer',
          display: 'flex',
          height: '200px',
          justifyContent: 'center',
          padding: 'var(--axiom-space-md)',
          transition: 'all 0.2s ease'
        }}
        tabIndex={0}
      >
        <input
          aria-hidden="true"
          multiple
          onChange={handleFileChange}
          ref={inputRef}
          style={{ display: 'none' }}
          type="file"
        />
        <p>{isDragActive ? 'Drop files here' : 'Drag and drop some files here, or click to select files'}</p>
      </div>
    )
  }
)

FileUploadDropzone.displayName = '@optiaxiom/react/FileUploadDropzone'