import { Component, OnInit } from "@angular/core";
import { PaymentDetailService } from "src/app/shared/payment-detail.service";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-payment-detail",
  templateUrl: "./payment-detail.component.html",
  styleUrls: ["./payment-detail.component.css"],
})
export class PaymentDetailComponent implements OnInit {
  constructor(
    public service: PaymentDetailService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form) form.reset();

    this.service.formData = {
      PMId: 0,
      CardOwnerName: "",
      CardNumber: "",
      ExpirationDate: "",
      CVV: "",
    };
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.PMId === 0) this.insert(form);
    else this.update(form);
  }

  private insert(form: NgForm) {
    this.service.postPaymentDetail().subscribe(
      (res) => {
        this.resetForm(form);
        this.toastr.success(
          "Submitted successfully",
          "Payment Detail Registered"
        );
        this.service.refreshList();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private update(form: NgForm) {
    this.service.putPaymentDetail().subscribe(
      (res) => {
        this.resetForm(form);
        this.toastr.info("Submitted successfully", "Payment Detail Updated");
        this.service.refreshList();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
