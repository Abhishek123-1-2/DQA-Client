import { Component, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() productsObjects: any[];
  @Input() sortedProductDetails: any[];
  @Input() selectedProductUin: string;
  @Input() selectedProductDetail: Set<string>;
  @Input() buttonsDisabled: boolean;
  @Output() productSelectionChanged = new EventEmitter<any>();
  isClosed = false;
  sidebarWidth = 250; // Default width
  

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.sidebarClosed$.subscribe(isClosed => {
      this.isClosed = isClosed;
      this.sidebarWidth = isClosed ? 0 : 250;
    });
  }

  onProductChange(selectedProductUin: string) {
    // Define your product change logic here
  }

  toggleProductDetail(productDetail: any) {
    // Define your toggle product detail logic here
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    const startX = event.pageX;
    const startWidth = this.sidebarWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const currentX = moveEvent.pageX;
      const newWidth = startWidth + (currentX - startX);
      this.sidebarWidth = Math.max(100, newWidth); // Minimum width of 100px
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  
}
