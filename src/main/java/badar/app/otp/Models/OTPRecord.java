package badar.app.otp.Models;

import java.time.Instant;

public class OTPRecord {

    private String otp;

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    private Instant timestamp;

}
