import { Directive, ElementRef, inject, input, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { Permission } from "./auth/auth.model";
import { LogDirective } from "./log.directive";

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)':'onClickEvent($event)'
    },
    hostDirectives:[LogDirective]
})

export class SafeLinkDirective{
    queryParam = input('myApp', {alias: 'appSafeLink'});
    hostElementReference = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
    
    onClickEvent(event: MouseEvent){
        const confirmation = window.confirm("Do you want to leave the page?");
        if(confirmation){
            const address = this.hostElementReference.nativeElement.href;
            this.hostElementReference.nativeElement.href = address + "?from="+ this.queryParam();
            return;
        }
        else{
            event.preventDefault()
        }
    }
}