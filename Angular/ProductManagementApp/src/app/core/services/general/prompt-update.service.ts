import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromptUpdateService {
  constructor(private swUpdate: SwUpdate) {}
  activateUpdate() {
    console.log('activate update is called');
    this.swUpdate.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
      )
      .subscribe((evt) => {
        console.log(evt);
        if (confirm('do you want to update?')) {
          // Reload the page to update to the latest version.
          document.location.reload();
        }
      });
  }
}
