#!/bin/bash

# Exit on error
set -e

# Source and destination directories
SRC_DIR="app/_components/ui"
DEST_DIR="app/components/ui"

# Create destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Function to compare files and copy if different
copy_if_different() {
    local src="$1"
    local dest="$2"
    
    if [ ! -f "$dest" ] || ! cmp -s "$src" "$dest"; then
        echo "Updating $dest"
        cp "$src" "$dest"
    else
        echo "Skipping $dest (no changes)"
    fi
}

# Process each file in source directory
for file in "$SRC_DIR"/*; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        dest_file="$DEST_DIR/$filename"
        
        echo "Processing $filename..."
        copy_if_different "$file" "$dest_file"
    fi
done

echo "\nMigration complete. Please review the changes and update any imports if necessary."
echo "You can now safely remove the $SRC_DIR directory if all components have been migrated."

# Update todo list
echo "\nUpdating todo list..."
# Mark the first todo as completed
echo "✅ Analysed current folder structure"
