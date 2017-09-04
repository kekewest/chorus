package chorus.domain.db.entity.security;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;

import chorus.security.AuthorityType;
import lombok.Data;

@Data
@Entity
public class User implements Serializable {

    @Id
    private String name;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private AuthorityType authority;

}
