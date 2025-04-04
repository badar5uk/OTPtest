package badar.app.otp.Controllers;


import badar.app.otp.Services.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/sms")
public class SmsController {

    @Autowired
    private SmsService smsService;

    @PostMapping("/send-otp")
    public String sendOtp(@RequestParam String phoneNumber) {
        try {
            smsService.sendOTP(phoneNumber);
            return "OTP sent successfully to " + phoneNumber;
        } catch (Exception e) {
            return "Error sending OTP: " + e.getMessage();
        }
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestParam String otp) {
        try {
            return smsService.verifyOTP(otp);
        } catch (Exception e) {
            return "Error" + e.getMessage();
        }
    }
}
