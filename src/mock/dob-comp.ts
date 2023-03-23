import {
  Directive,
  Input,
  TemplateRef,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {
  @Input('tooltip') tooltipTemplate!: TemplateRef<any>;

  private tooltip!: HTMLElement;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    // Add CSS rule to position and style tooltip
    const style = this.renderer.createElement('style');
    style.textContent = `
      .tooltip-wrapper {
        position: absolute;
        z-index: 9999;
      }
    `;
    this.renderer.appendChild(document.head, style);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    if (!this.tooltip) {
      this.createTooltip();
    }

    this.renderer.setStyle(this.tooltip, 'display', 'block');
  }

  private hideTooltip() {
    this.renderer.setStyle(this.tooltip, 'display', 'none');
  }

  private createTooltip() {
    const style = this.renderer.createElement('style');
    style.textContent = `
  .tooltip-wrapper {
    position: absolute;
    z-index: 9999;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  .tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    margin: 5px;
  }

  .tooltip-arrow.top {
    border-width: 0 5px 5px 5px;
    border-color: transparent transparent #fff transparent;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
  }

  .tooltip-arrow.bottom {
    border-width: 5px 5px 0 5px;
    border-color: #fff transparent transparent transparent;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
  }

  .tooltip-content {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    color: #333;
    font-size: 14px;
    line-height: 1.5;

    padding: 10px;
    text-align: center;
    pointer-events: auto;
  }
`;
    this.renderer.appendChild(document.head, style);

    const tooltipWrapper = this.renderer.createElement('div');
    const tooltipContent = this.tooltipTemplate.createEmbeddedView(null);
    const tooltipContentElement = tooltipContent.rootNodes[0];

    // Calculate position of the host element
    const hostElement = this.elRef.nativeElement;

    const hostRect = hostElement.getBoundingClientRect();
    const hostCenter = (hostRect.left + hostRect.width) / 2;

    // Calculate position of the tooltip
    const tooltipRect = tooltipWrapper.getBoundingClientRect();
    const tooltipWidth = tooltipRect.width;
    const tooltipHeight = hostElement.offsetHeight;

    console.log('hostRect.offsetHeight : ' + hostElement.offsetHeight);
    console.log('tooltipHeight : ' + tooltipHeight);

    console.log('hostRect.left : ' + hostRect.left);
    console.log('hostCenter : ' + hostCenter);
    console.log('tooltipWidth : ' + tooltipWidth);

    // Set position of the tooltip
    this.renderer.setStyle(
      tooltipWrapper,
      'top',
      `${hostRect.top + tooltipHeight}px`
    );
    this.renderer.setStyle(
      tooltipWrapper,
      'left',
      `${(hostCenter - tooltipWidth) / 2}px`
    );

    this.renderer.addClass(tooltipWrapper, 'tooltip-wrapper');
    this.renderer.appendChild(tooltipWrapper, tooltipContentElement);
    this.renderer.appendChild(hostElement, tooltipWrapper);

    // Add class name to tooltip content element
    this.renderer.addClass(tooltipContentElement, 'tooltip-content');

    this.tooltip = tooltipWrapper;

    // this.renderer.appendChild(tooltipWrapper, tooltipContent.rootNodes[0]);
  }
}
