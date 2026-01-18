package in.amar.billingsoftware.service;

import com.razorpay.RazorpayException;
import in.amar.billingsoftware.io.RazorpayOrderResponse;

public interface RazorpayService {

    RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}
