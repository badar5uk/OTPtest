package badar.app.otp.Repositories;

import badar.app.otp.Models.OTPRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;

@Repository
public interface OTPRecordRepository extends JpaRepository<OTPRecord, Long> {

    @Query(value = "SELECT o FROM OTPRecord o WHERE o.otp = :otp")
    OTPRecord findOtpRecordByOtp(@Param("otp") String otp);

}
