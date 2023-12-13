function handleFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedImage = inputElement.files?.[0] as File;
    this.name = selectedImage.name
    
    if (selectedImage) {
      this.imageService.recupImg(selectedImage).subscribe({
        next: (arg) => {
          this.img = arg as string;
          this.articleForm.patchValue({
            photo: this.img, 
          });
        }
      });
    }
    // console.log(this.name);
    // console.log(this.img);
  }
 