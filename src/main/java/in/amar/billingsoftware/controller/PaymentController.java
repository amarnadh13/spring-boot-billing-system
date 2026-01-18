package in.amar.billingsoftware.controller;

import com.razorpay.RazorpayException;
import in.amar.billingsoftware.io.OrderResponse;
import in.amar.billingsoftware.io.PaymentRequest;
import in.amar.billingsoftware.io.PaymentVerificationRequest;
import in.amar.billingsoftware.io.RazorpayOrderResponse;
import in.amar.billingsoftware.service.OrderService;
import in.amar.billingsoftware.service.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException {
        return razorpayService.createOrder(request.getAmount(), request.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request) throws RazorpayException {
        return orderService.verifyPayment(request);
    }
}
