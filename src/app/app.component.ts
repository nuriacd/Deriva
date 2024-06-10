import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements AfterViewInit{
  /*
  @ViewChild('shoppingCart') shoppingCart!: ElementRef;
  @ViewChild('footer') footer!: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => this.checkScroll(), 100);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  private checkScroll() {
    if (!this.shoppingCart || !this.footer) {
      console.log('no hay cart o footer');
      return;
    }

    const cartElement = this.shoppingCart.nativeElement;
    const footerElement = this.footer.nativeElement;
    const cartHeight = cartElement.offsetHeight;
    const footerRect = footerElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (footerRect.top < windowHeight) {
      console.log('debajo')
      cartElement.style.position = 'absolute';
      cartElement.style.bottom = `${windowHeight - footerRect.top + 20}px`;
    } else {
      console.log('arriba')
      cartElement.style.position = 'fixed';
      cartElement.style.bottom = '20px';
    }
  }*/
  private shoppingCart!: HTMLElement;
  private footer!: HTMLElement;

  ngAfterViewInit() {
    setTimeout(() => {
      let shoppingCart = document.querySelector('#shopping-cart') as HTMLElement;
      let footer = document.querySelector('#footer') as HTMLElement;

      if (shoppingCart && footer) {
        this.checkScroll();
      }
    }, 200);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  private checkScroll() {
    let shoppingCart = document.querySelector('#shopping-cart') as HTMLElement;
    let footer = document.querySelector('#footer') as HTMLElement;

    if (!shoppingCart || !footer) {
      return;
    }

    const cartElement = shoppingCart;
    const footerElement = footer;
    const footerRect = footerElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (footerRect.top < windowHeight) {
      cartElement.style.position = 'fixed';
      cartElement.style.bottom = `${windowHeight - footerRect.top + 20}px`;
      
    } else {
      cartElement.style.position = 'fixed';
      cartElement.style.bottom = '20px';
    }
  }
}
