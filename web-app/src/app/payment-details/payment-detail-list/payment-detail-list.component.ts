import { Component, OnInit } from "@angular/core";
import { PaymentDetailService } from "src/app/shared/payment-detail.service";
import { PaymentDetail } from "src/app/shared/payment-detail.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-payment-detail-list",
  templateUrl: "./payment-detail-list.component.html",
  styleUrls: ["./payment-detail-list.component.css"],
})
export class PaymentDetailListComponent implements OnInit {
  constructor(
    public service: PaymentDetailService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pd: PaymentDetail) {
    this.service.formData = { ...pd };
  }

  onDelete(PMId) {
    if (!confirm("Are you sure to delete this record ?")) return;
    this.service.deletePaymentDetail(PMId).subscribe(
      (res) => {
        this.toastr.warning(
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
}
