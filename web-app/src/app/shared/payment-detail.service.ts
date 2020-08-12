import { Injectable } from "@angular/core";
import { PaymentDetail } from "./payment-detail.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PaymentDetailService {
  formData: PaymentDetail;

  readonly rootUrl = "http://localhost:7735/api/";
  list: PaymentDetail[];

  constructor(private http: HttpClient) {}

  postPaymentDetail() {
    return this.http.post(this.rootUrl + "paymentDetail", this.formData);
  }

  putPaymentDetail() {
    return this.http.put(
      this.rootUrl + "paymentDetail/" + this.formData.PMId,
      this.formData
    );
  }

  deletePaymentDetail(PMId) {
    return this.http.delete(this.rootUrl + "paymentDetail/" + PMId);
  }

  refreshList() {
    this.http
      .get(this.rootUrl + "paymentDetail")
      .toPromise()
      .then((res) => (this.list = res as PaymentDetail[]));
  }
}
