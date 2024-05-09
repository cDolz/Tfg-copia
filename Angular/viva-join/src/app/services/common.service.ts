import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  generateMonths() {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return monthNames.map((month, index) => {
      return { name: month, number: (index + 1).toString().padStart(2, '0') };
    });
  }

  onPaste(event: ClipboardEvent) {
    let pastedText = event?.clipboardData?.getData('text');
    
    // Limit the pasted text to 300 characters
    if (pastedText!.length > 300) {
      pastedText = pastedText!.substr(0, 300);
      
      // Prevent the original pasted text from being pasted
      event.preventDefault();
      
      // Insert the trimmed text
      document.execCommand('insertText', false, pastedText);
    }
  }
  
}
