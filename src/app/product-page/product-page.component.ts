
// import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { Product, ProductService } from '../services/product.services';
// import { animate, query, state, style, transition, trigger } from '@angular/animations';
// import { Router } from '@angular/router';
// import { NgZone } from '@angular/core';
// interface Message {
//   type: 'user' | 'bot';
//   text: string;
//   time?: string;
//   userQuery?: string;
//   productname?: string;
//   productuin?: string;
//   productdetails?: string[];
//   animationState?: 'thinking' | 'typing';
//   buttonsVisible?: boolean;
// }

// @Component({
//   selector: 'app-product-page',
//   templateUrl: './product-page.component.html',
//   styleUrls: ['./product-page.component.css'],
//   animations: [
//     trigger('messageAnimation', [
//       state('thinking', style({
//         opacity: 0.5
//       })),
//       state('typing', style({
//         opacity: 1
//       })),
//       transition('thinking => typing', [
//         animate('1s')
//       ])
//     ])
//   ]
// })

// export class ProductPageComponent implements OnInit {

//   @ViewChild('ratingModal') private ratingModal!: ElementRef;

//   doc_selected: string = '';
//   selectedProductDetail: Set<string> = new Set();
//   product_details: any = {};
//   selectionLimit: number = 6;
//   countProductDetails: number = 0;
//   limitReached: boolean = false;
//   loadSucess: boolean = false;
//   viewChat: boolean = false;
//   buttonsDisabled: boolean = false;
//   messageCopied: boolean = false;
//   messageRated: boolean = false;
//   messageTime: boolean = false;
//   isTyping: boolean = false;

//   userQuery: string = ''; // Bind user input
//   // messages: { type: string, text: string }[] = []; // Store chat messages
//   messages: Message[] = [];

//   products: { [key: string]: string } = {};
//   selectedProductUin: string = '';
//   relevantContext: string = '';
//   contextLines: string[];
//   // public sidebarWidth: string = '300px';  // Default sidebar width
//   public rightColumnWidth: string = 'calc(100% - 300px)'; // Calculate the right column width based on sidebar width
  


//   @ViewChild('chatContainer') private chatContainer!: ElementRef;
//   productsObjects: { product_uin: any; product_name: any; }[];
//   errorMessage: any;
//   result: any;

//   rating: number;
//   productName: string = '';
//   sortedProductDetails: any[] = [];

//   desiredOrder: string[] = [
//     "PRODUCT",
//     "KEY HIGHLIGHTS",
//     "AGE AT ENTRY",
//     "AGE OF ENTRY",
//     "MAXIMUM AGE AT MATURITY",
//     "BASIC SUM ASSURED",
//     "BENEFIT STRUCTURE"
//   ];

//   currentMessage: Message;

//   totalTimeUsed: string;
//   timeTaken: string;

//   constructor(private zone: NgZone,private productService: ProductService, private router: Router) { }

//   ngOnInit() {
//     // const sidebar = this.resizableSidebar.nativeElement as HTMLElement;
//     // sidebar.style.width = this.sidebarWidth;  // Set sidebar's initial width
//     this.productService.getUniqueProducts().subscribe({
//       next: (data) => {
//         console.log(data)
//         this.productsObjects = data.map(item => ({
//           product_uin: item[0],
//           product_name: item[1]
//         }));
//         // this.productName = this.productsObjects[0].product_name;  // Log the transformed data
//         // console.log(this.productName);
//       },
//       error: (err) => {
//         console.error('Failed to get products', err);
//       }
//     });
//   }

//   onProductChange(selectedProductUin: string): void {
//     this.messages = [];
//     console.log('Selected Product UIN:', selectedProductUin);
//     console.log(this.productsObjects)
//     const product = this.productsObjects.find(p => p.product_uin === selectedProductUin);
//     this.productName = product.product_name
//     console.log(this.productName)
//     this.productService.getProductDetails(selectedProductUin).subscribe(
//       (details) => {
//         this.product_details = details;
//         this.sortedProductDetails = this.sortProductDetails(this.product_details, this.desiredOrder);
//         console.log(this.sortedProductDetails)
//       },
//       (error) => {
//         this.errorMessage = error;
//         console.error('Error fetching product details:', error);
//       }
//     );
//     // this.product_details = this.products[selectedProductUin] || [];
//     this.selectedProductDetail.clear();
//     this.setToDefault()
//     this.viewChat = false;
//   }

//   ngAfterViewChecked() {
//     this.scrollToBottom();
//   }

//   scrollToBottom(): void {
//     try {
//       this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
//     } catch (err) { }
//   }

//   sortProductDetails(details: any, order: string[]): string[] {
//     const sortedDetails: any[] = [];
//     // Add elements from desiredOrder if they exist in the original details array
//     for (const item of order) {
//       const foundItem = details.find(detail => detail.product_detail === item);
//       if (foundItem) {
//         sortedDetails.push(foundItem);
//       }
//     }
//     // Add the remaining elements that were not in desiredOrder
//     for (const item of details) {
//       if (!sortedDetails.find(sd => sd.product_detail === item.product_detail)) {
//         sortedDetails.push(item);
//       }
//     }
//     return sortedDetails;
//   }

//   formatTime(seconds: number): string {
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     const s = Math.floor(seconds % 60);
//     return `${this.padZero(h)}:${this.padZero(m)}:${this.padZero(s)}`;
//   }
  
//   padZero(num: number): string {
//     return num < 10 ? '0' + num : num.toString();
//   }
  

//   toggleProductDetail(product_detail: any) {
//     if (this.selectedProductDetail.has(product_detail.product_detail)) {
//       this.selectedProductDetail.delete(product_detail.product_detail);
//     } else {
//       if (this.selectedProductDetail.size < this.selectionLimit) {
//         this.selectedProductDetail.add(product_detail.product_detail);
//         this.countProductDetails = this.countProductDetails + product_detail.count;
//         this.limitReached = false;
//       } else {
//         this.limitReached = true;
//         setTimeout(() => {
//           this.limitReached = false; // Hide the alert after 3 seconds
//         }, 2500);
//       }
//     }
//   }

//   getSelectedProductDetails(): string[] {
//     return Array.from(this.selectedProductDetail);
//   }

//   loadProductDetails() {
//     console.log('Load button clicked. Selected details:', this.getSelectedProductDetails());
//     this.limitReached = false;
//     this.loadSucess = true;
//     console.log(this.countProductDetails);
//     setTimeout(() => {
//       this.loadSucess = false; // Hide the alert after 3 seconds
//       this.viewChat = true;
//     }, 2500);
//     this.buttonsDisabled = true; // Disable buttons once loaded
//   }

//   resetProductDetails() {
//     this.selectedProductDetail.clear();
//     this.messages = [];
//     this.countProductDetails = 0;
//     this.limitReached = false;
//     this.buttonsDisabled = false;
//     this.viewChat = false;
//     this.relevantContext = '';
//     this.contextLines = [];
//   }

//   setToDefault() {
//     this.limitReached = false;
//     this.buttonsDisabled = false;
//     this.loadSucess = false;
//   }

//   sendMessage() {
//     const queryData = {
//       query: this.userQuery,
//       product_uin: this.selectedProductUin,
//       product_details: Array.from(this.selectedProductDetail),
//       product_count: this.countProductDetails
//     };

//     if (this.userQuery.trim()) {
//       this.messages.push({ type: 'user', text: this.userQuery });
//       this.userQuery = ''; // Clear input after sending
//       this.isTyping = true;
//       const botMessage: Message = { type: 'bot', text: 'Thinking...', animationState: 'thinking', userQuery: queryData.query, productuin: queryData.product_uin, productdetails: queryData.product_details, buttonsVisible: false };
//       this.messages.push(botMessage);

//       const startTime = Date.now();

//       this.productService.processQuery(queryData).subscribe(
//         (response) => {
//           const endTime = Date.now();
//           const processingTime = (endTime - startTime) / 1000;
//           this.totalTimeUsed = this.formatTime(processingTime);

//           this.result = response;
//           console.log('Query Result:', this.result);
//           console.log(this.messages)
          
//           botMessage.text = '';
//           botMessage.animationState = 'typing';
//           botMessage.time = this.totalTimeUsed;

//           this.typeMessage(this.result.answer, this.messages.indexOf(botMessage));
//           this.relevantContext = this.result.relevant_context;
//           this.contextLines = this.relevantContext.split('\n').map(line =>
//             line.replace(' =>', ':') // Replace '=>' with ':'
//           );
//         },
//         (error) => {
//           this.errorMessage = error;
//           this.isTyping = false;
//           console.error('Error:', error);
//         }
//       );
//     }
//   }

//   handleKeydown(event: KeyboardEvent) {
//     if (event.key === 'Enter') {
//       this.sendMessage();
//     }
//   }

//   typeMessage(text: string, index: number) {
//     let i = 0;
//     const interval = setInterval(() => {
//       if (i < text.length) {
//         this.messages[index].text += text.charAt(i);
//         i++;
//       } else {
//         this.messages[index].buttonsVisible = true;
//         this.isTyping = false;
//         clearInterval(interval);
//       }
//     }, 50);
//   }

//   copyMessage(text: string) {
//     if (navigator.clipboard && navigator.clipboard.writeText) {
//       navigator.clipboard.writeText(text).then(() => {
//         console.log('Message copied to clipboard');
//         this.messageCopied = true;
//         setTimeout(() => {
//           this.messageCopied = false;
//         }, 1000);
//       }).catch(err => {
//         console.error('Failed to copy message: ', err);
//       });
//     } else {
//       this.fallbackCopyTextToClipboard(text);
//     }
//   }

//   private fallbackCopyTextToClipboard(text: string) {
//     const textarea = document.createElement('textarea');
//     textarea.value = text;
//     textarea.style.position = 'fixed';  // Prevent scrolling to bottom of the page
//     textarea.style.opacity = '0';       // Hide the textarea
//     document.body.appendChild(textarea);
//     textarea.focus();
//     textarea.select();
  
//     try {
//       const successful = document.execCommand('copy');
//       if (successful) {
//         console.log('Message copied to clipboard');
//         this.messageCopied = true;
//         setTimeout(() => {
//           this.messageCopied = false;
//         }, 1000);
//       } else {
//         console.error('Failed to copy message');
//       }
//     } catch (err) {
//       console.error('Failed to copy message: ', err);
//     }
  
//     document.body.removeChild(textarea);  // Clean up
//   }

//   rateMessage(message: Message) {
//     this.currentMessage = message;
//     console.log('Message to be rated:', message);
//   }

//   showTime(message: Message) {
//     this.messageTime = true;
//     this.timeTaken = message.time
//     console.log('Time Taken: ', message.time);
//     setTimeout(() => {
//         this.timeTaken = null;
//         this.messageTime = false;
//     }, 1000);
//   }

//   infoMessage() {
//     console.log('Info about the message');
//   }

//   storeData() {
//     if (this.currentMessage) {
//       const ratingData = {
//         context: this.relevantContext,
//         query: this.currentMessage.userQuery,
//         answer: this.currentMessage.text,
//         rating: this.rating,
//         product_name: this.productName,
//         product_uin: this.currentMessage.productuin,
//         product_details: this.currentMessage.productdetails
//       };
//       console.log('Storing rating data:', ratingData);
//       this.productService.rateAnswer(ratingData).subscribe(
//         (response) => {
//           console.log(response);
//           this.messageRated = true;
//           setTimeout(() => {
//             this.messageRated = false;
//           }, 1000);
//           this.rating = null;
//           this.currentMessage = null; // Reset the current message after processing
//         },
//         (error) => {
//           this.errorMessage = error;
//           console.error('Error: ', error);
//           this.currentMessage = null; // Reset the current message after processing
//         }
//       );
//     }
//   }

//   logout() {
//     this.router.navigate([''])
//     this.resetProductDetails()
//   }

//   home() {
//     this.router.navigate(['user-menu'])
//     this.resetProductDetails()
//   }
//   sidebarVisible: boolean = true;

//   @ViewChild('resizableSidebar', { static: false }) resizableSidebar!: ElementRef;
//   @ViewChild('resizeHandle', { static: false }) resizeHandle!: ElementRef;

  

// //   toggleSidebar() {
// //     this.sidebarVisible = !this.sidebarVisible;
// //     if (this.sidebarVisible) {
// //         // Set the sidebar to the default width when visible
// //         this.sidebarWidth = '300px';
// //         this.rightColumnWidth = 'calc(100% - 300px)';
// //     } else {
// //         // Hide the sidebar completely
// //         this.sidebarWidth = '0px';
// //         this.rightColumnWidth = '100%';
// //     }
// // }



//   // ngAfterViewInit() {
//   //   this.initResizableSidebar();
//   // }

// //   initResizableSidebar() {
// //     const sidebar = this.resizableSidebar.nativeElement as HTMLElement;
// //     const handle = this.resizeHandle.nativeElement as HTMLElement;
// //     let isResizing = false;

// //     handle.addEventListener('mousedown', (e) => {
// //         isResizing = true;
// //         document.addEventListener('mousemove', resize, false);
// //         document.addEventListener('mouseup', stopResize, false);
// //     });

// //     const resize = (e: MouseEvent) => {
// //       if (isResizing) {
// //           const newWidth = e.clientX - sidebar.getBoundingClientRect().left;
// //           if (newWidth > 300 && newWidth < 600) {
// //               sidebar.style.width = `${newWidth}px`;
// //               this.zone.run(() => { // Make sure Angular detects this change
// //                   this.rightColumnWidth = `calc(100% - ${newWidth}px)`;
// //               });
// //           }
// //       }
// //   };
// //     const stopResize = () => {
// //         isResizing = false;
// //         document.removeEventListener('mousemove', resize);
// //         document.removeEventListener('mouseup', stopResize);
// //     };
// // }
// public sidebarWidth: string = '300px'; // Default sidebar width
//     private defaultSidebarWidth: string = '300px'; // Constant for default width
//     private sidebarManuallyResized: boolean = false; // Track if resized manually

//     toggleSidebar() {
//         if (this.sidebarManuallyResized) {
//             // Reset sidebar width to default if it was manually resized
//             this.sidebarWidth = this.defaultSidebarWidth;
//             this.rightColumnWidth = `calc(100% - ${this.sidebarWidth})`;
//             this.sidebarManuallyResized = false; // Reset the flag
//         }
//     }

//     // Adjusted method to handle manual resizing
//     handleResize(newWidth: number) {
//         this.sidebarWidth = `${newWidth}px`;
//         this.rightColumnWidth = `calc(100% - ${this.sidebarWidth})`;
//         this.sidebarManuallyResized = true; // Set the flag when manually resized
//     }

//     ngAfterViewInit() {
//         this.initResizableSidebar();
//     }

//     initResizableSidebar() {
//         const sidebar = this.resizableSidebar.nativeElement as HTMLElement;
//         const handle = this.resizeHandle.nativeElement as HTMLElement;
//         let isResizing = false;

//         handle.addEventListener('mousedown', (e) => {
//             isResizing = true;
//             document.addEventListener('mousemove', resize, false);
//             document.addEventListener('mouseup', stopResize, false);
//         });

//         const resize = (e: MouseEvent) => {
//             if (isResizing) {
//                 const newWidth = e.clientX - sidebar.getBoundingClientRect().left;
//                 if (newWidth > 300 && newWidth < 600) {
//                     this.handleResize(newWidth); // Call handleResize instead of directly setting width
//                 }
//             }
//         };

//         const stopResize = () => {
//             isResizing = false;
//             document.removeEventListener('mousemove', resize);
//             document.removeEventListener('mouseup', stopResize);
//         };
//     }
// }

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Product, ProductService } from '../services/product.services';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

interface Message {
  type: 'user' | 'bot';
  text: string;
  time?: string;
  userQuery?: string;
  productname?: string;
  productuin?: string;
  productdetails?: string[];
  animationState?: 'thinking' | 'typing';
  buttonsVisible?: boolean;
}

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  animations: [
    trigger('messageAnimation', [
      state('thinking', style({
        opacity: 0.5
      })),
      state('typing', style({
        opacity: 1
      })),
      transition('thinking => typing', [
        animate('1s')
      ])
    ])
  ]
})

export class ProductPageComponent implements OnInit {

  @ViewChild('ratingModal') private ratingModal!: ElementRef;

  doc_selected: string = '';
  selectedProductDetail: Set<string> = new Set();
  product_details: any = {};
  selectionLimit: number = 6;
  countProductDetails: number = 0;
  limitReached: boolean = false;
  loadSucess: boolean = false;
  viewChat: boolean = false;
  buttonsDisabled: boolean = false;
  messageCopied: boolean = false;
  messageRated: boolean = false;
  messageTime: boolean = false;
  isTyping: boolean = false;
  pdfSrc: string = ''; // URL of the PDF file

  userQuery: string = ''; // Bind user input
  // messages: { type: string, text: string }[] = []; // Store chat messages
  messages: Message[] = [];

  products: { [key: string]: string } = {};
  selectedProductUin: string = '';
  relevantContext: string = '';
  contextLines: string[];
  public sidebarWidth: string = '300px';  // Default sidebar width
  public rightColumnWidth: string = 'calc(100% - 300px)'; // Calculate the right column width based on sidebar width
  public isSidebarCollapsed: boolean = false; // To track the state of the sidebar

  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  productsObjects: { product_uin: any; product_name: any; }[];
  errorMessage: any;
  result: any;

  rating: number;
  productName: string = '';
  sortedProductDetails: any[] = [];

  desiredOrder: string[] = [
    "PRODUCT",
    "KEY HIGHLIGHTS",
    "AGE AT ENTRY",
    "AGE OF ENTRY",
    "MAXIMUM AGE AT MATURITY",
    "BASIC SUM ASSURED",
    "BENEFIT STRUCTURE"
  ];

  currentMessage: Message;

  totalTimeUsed: string;
  timeTaken: string;

  constructor(private zone: NgZone, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.productService.getUniqueProducts().subscribe({
      next: (data) => {
        console.log(data)
        this.productsObjects = data.map(item => ({
          product_uin: item[0],
          product_name: item[1]
        }));
      },
      error: (err) => {
        console.error('Failed to get products', err);
      }
    });
  }

  onProductChange(selectedProductUin: string): void {
    this.messages = [];
    console.log('Selected Product UIN:', selectedProductUin);
    console.log(this.productsObjects)
    const product = this.productsObjects.find(p => p.product_uin === selectedProductUin);
    this.productName = product.product_name;
    console.log(this.productName);
    this.productService.getProductDetails(selectedProductUin).subscribe(
      (details) => {
        this.product_details = details;
        this.sortedProductDetails = this.sortProductDetails(this.product_details, this.desiredOrder);
        console.log(this.sortedProductDetails);
      },
      (error) => {
        this.errorMessage = error;
        console.error('Error fetching product details:', error);
      }
    );
    this.selectedProductDetail.clear();
    this.setToDefault();
    this.viewChat = false;

    // Set the PDF source to the path in the assets folder
    this.pdfSrc = "";
  }


  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  sortProductDetails(details: any, order: string[]): string[] {
    const sortedDetails: any[] = [];
    for (const item of order) {
      const foundItem = details.find(detail => detail.product_detail === item);
      if (foundItem) {
        sortedDetails.push(foundItem);
      }
    }
    for (const item of details) {
      if (!sortedDetails.find(sd => sd.product_detail === item.product_detail)) {
        sortedDetails.push(item);
      }
    }
    return sortedDetails;
  }

  formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${this.padZero(h)}:${this.padZero(m)}:${this.padZero(s)}`;
  }
  
  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  toggleProductDetail(product_detail: any) {
    if (this.selectedProductDetail.has(product_detail.product_detail)) {
      this.selectedProductDetail.delete(product_detail.product_detail);
    } else {
      if (this.selectedProductDetail.size < this.selectionLimit) {
        this.selectedProductDetail.add(product_detail.product_detail);
        this.countProductDetails = this.countProductDetails + product_detail.count;
        this.limitReached = false;
      } else {
        this.limitReached = true;
        setTimeout(() => {
          this.limitReached = false; // Hide the alert after 3 seconds
        }, 2500);
      }
    }
  }

  getSelectedProductDetails(): string[] {
    return Array.from(this.selectedProductDetail);
  }

  loadProductDetails() {
    console.log('Load button clicked. Selected details:', this.getSelectedProductDetails());
    this.limitReached = false;
    this.loadSucess = true;
    console.log(this.countProductDetails);
    setTimeout(() => {
      this.loadSucess = false; // Hide the alert after 3 seconds
      this.viewChat = true;
    }, 2500);
    this.buttonsDisabled = true; // Disable buttons once loaded
  }

  resetProductDetails() {
    this.selectedProductDetail.clear();
    this.messages = [];
    this.countProductDetails = 0;
    this.limitReached = false;
    this.buttonsDisabled = false;
    this.viewChat = false;
    this.relevantContext = '';
    this.contextLines = [];
  }

  setToDefault() {
    this.limitReached = false;
    this.buttonsDisabled = false;
    this.loadSucess = false;
  }

  sendMessage() {
    const queryData = {
      query: this.userQuery,
      product_uin: this.selectedProductUin,
      product_details: Array.from(this.selectedProductDetail),
      product_count: this.countProductDetails
    };

    if (this.userQuery.trim()) {
      this.messages.push({ type: 'user', text: this.userQuery });
      this.userQuery = ''; // Clear input after sending
      this.isTyping = true;
      const botMessage: Message = { type: 'bot', text: 'Thinking...', animationState: 'thinking', userQuery: queryData.query, productuin: queryData.product_uin, productdetails: queryData.product_details, buttonsVisible: false };
      this.messages.push(botMessage);

      const startTime = Date.now();

      this.productService.processQuery(queryData).subscribe(
        (response) => {
          const endTime = Date.now();
          const processingTime = (endTime - startTime) / 1000;
          this.totalTimeUsed = this.formatTime(processingTime);

          this.result = response;
          console.log('Query Result:', this.result);
          console.log(this.messages)
          
          botMessage.text = '';
          botMessage.animationState = 'typing';
          botMessage.time = this.totalTimeUsed;

          this.typeMessage(this.result.answer, this.messages.indexOf(botMessage));
          this.relevantContext = this.result.relevant_context;
          this.contextLines = this.relevantContext.split('\n').map(line =>
            line.replace(' =>', ':') // Replace '=>' with ':'
          );
        },
        (error) => {
          this.errorMessage = error;
          this.isTyping = false;
          console.error('Error:', error);
        }
      );
    }
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  typeMessage(text: string, index: number) {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        this.messages[index].text += text.charAt(i);
        i++;
      } else {
        this.messages[index].buttonsVisible = true;
        this.isTyping = false;
        clearInterval(interval);
      }
    }, 50);
  }

  copyMessage(text: string) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        console.log('Message copied to clipboard');
        this.messageCopied = true;
        setTimeout(() => {
          this.messageCopied = false;
        }, 1000);
      }).catch(err => {
        console.error('Failed to copy message: ', err);
      });
    } else {
      this.fallbackCopyTextToClipboard(text);
    }
  }

  private fallbackCopyTextToClipboard(text: string) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';  // Prevent scrolling to bottom of the page
    textarea.style.opacity = '0';       // Hide the textarea
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
  
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        console.log('Message copied to clipboard');
        this.messageCopied = true;
        setTimeout(() => {
          this.messageCopied = false;
        }, 1000);
      } else {
        console.error('Failed to copy message');
      }
    } catch (err) {
      console.error('Failed to copy message: ', err);
    }
  
    document.body.removeChild(textarea);  // Clean up
  }

  rateMessage(message: Message) {
    this.currentMessage = message;
    console.log('Message to be rated:', message);
  }

  showTime(message: Message) {
    this.messageTime = true;
    this.timeTaken = message.time
    console.log('Time Taken: ', message.time);
    setTimeout(() => {
        this.timeTaken = null;
        this.messageTime = false;
    }, 1000);
  }

  infoMessage() {
    console.log('Info about the message');
  }

  storeData() {
    if (this.currentMessage) {
      const ratingData = {
        context: this.relevantContext,
        query: this.currentMessage.userQuery,
        answer: this.currentMessage.text,
        rating: this.rating,
        product_name: this.productName,
        product_uin: this.currentMessage.productuin,
        product_details: this.currentMessage.productdetails
      };
      console.log('Storing rating data:', ratingData);
      this.productService.rateAnswer(ratingData).subscribe(
        (response) => {
          console.log(response);
          this.messageRated = true;
          setTimeout(() => {
            this.messageRated = false;
          }, 1000);
          this.rating = null;
          this.currentMessage = null; // Reset the current message after processing
        },
        (error) => {
          this.errorMessage = error;
          console.error('Error: ', error);
          this.currentMessage = null; // Reset the current message after processing
        }
      );
    }
  }

  logout() {
    this.router.navigate([''])
    this.resetProductDetails()
  }

  home() {
    this.router.navigate(['user-menu'])
    this.resetProductDetails()
  }

  @ViewChild('resizableSidebar', { static: false }) resizableSidebar!: ElementRef;
  @ViewChild('resizeHandle', { static: false }) resizeHandle!: ElementRef;

  toggleSidebar() {
    if (this.isSidebarCollapsed) {
      this.sidebarWidth = '300px';
      this.rightColumnWidth = 'calc(100% - 300px)';
      this.isSidebarCollapsed = false;
    } else {
      this.sidebarWidth = '150px';
      this.rightColumnWidth = 'calc(100% - 150px)';
      this.isSidebarCollapsed = true;
    }
  }

  // Adjusted method to handle manual resizing
  handleResize(newWidth: number) {
    this.sidebarWidth = `${newWidth}px`;
    this.rightColumnWidth = `calc(100% - ${this.sidebarWidth})`;
    this.isSidebarCollapsed = newWidth <= 150; // Set the flag when manually resized to 150px or less
  }

  ngAfterViewInit() {
    this.initResizableSidebar();
  }

  initResizableSidebar() {
    const sidebar = this.resizableSidebar.nativeElement as HTMLElement;
    const handle = this.resizeHandle.nativeElement as HTMLElement;
    let isResizing = false;

    handle.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.addEventListener('mousemove', resize, false);
        document.addEventListener('mouseup', stopResize, false);
    });

    const resize = (e: MouseEvent) => {
      if (isResizing) {
          const newWidth = e.clientX - sidebar.getBoundingClientRect().left;
          if (newWidth > 150 && newWidth < 600) {
              this.handleResize(newWidth); // Call handleResize instead of directly setting width
          }
      }
  };

    const stopResize = () => {
        isResizing = false;
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
    };
  }

  getAbbreviatedText(text: string): string {
    const words = text.split(' ');
    return words.map(word => word[0]).join('');
  }
}
