package chorus.domain.db.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Data
public class Auditing implements Serializable {

    @LastModifiedBy
    private String updatedBy;

    @LastModifiedDate
    private LocalDateTime updateDateTime;

    @CreatedBy
    private String createdBy;

    @CreatedDate
    private LocalDateTime createDateTime;

}
