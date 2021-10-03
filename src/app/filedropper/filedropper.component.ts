import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BeClientService} from "../be-client.service";

@Component({
    selector: 'app-filedropper',
    templateUrl: './filedropper.component.html',
    styleUrls: ['./filedropper.component.css']
})
export class FiledropperComponent implements OnInit {

    // @ts-ignore
    @ViewChild("fileDropRef", {static: false}) fileDropEl: ElementRef;
    files: any[] = [];

    constructor(private beClientService: BeClientService) {
    }

    ngOnInit(): void {
    }

    /**
     * on file drop handler
     */
    onFileDropped($event: any) {
        this.prepareFilesList($event.target.files);
    }

    /**
     * format bytes
     * @param bytes (File size in bytes)
     * @param decimals (Decimals point)
     */
    formatBytes(bytes: any, decimals = 2) {
        if (bytes === 0) {
            return "0 Bytes";
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

    /**
     * handle file from browsing
     */
    fileBrowseHandler($event: Event) {
        const target = $event.target as HTMLInputElement;
        const files = target.files;
        this.prepareFilesList(files);
    }

    /**
     * Delete file from files list
     * @param index (File index)
     */
    deleteFile(index: number) {
        if (this.files[index].progress < 100) {
            console.log("Upload in progress.");
            return;
        }
        this.files.splice(index, 1);
    }


    /**
     * Simulate the upload process
     */
    uploadFilesSimulator(index: number) {
        setTimeout(() => {
            if (index === this.files.length) {
                return;
            } else {
                const progressInterval = setInterval(() => {
                    if (this.files[index].progress === 100) {
                        clearInterval(progressInterval);
                        this.uploadFilesSimulator(index + 1);
                    } else {
                        this.files[index].progress += 5;
                    }
                }, 200);
            }
        }, 1000);
    }

    uploadReport(files: any) {
        this.beClientService.uploadReport(files).subscribe();
    }

    /**
     * Convert Files list to normal array list
     * @param files (Files List)
     */
    prepareFilesList(files: FileList | null) {
        // for (const item of files) {
        //     item.progress = 0;
        //     this.files.push(item);
        // }
        // this.fileDropEl.nativeElement.value = "";
        // @ts-ignore
        console.log(files);
        if (files) {
            this.uploadReport(files[0]);
        }
        // this.uploadFilesSimulator(0);
    }

}
