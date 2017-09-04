package chorus.domain.db.entity.contents;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import chorus.domain.db.entity.security.AreaAccessAuthority;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(exclude = { "authorities" })
@Data
@Entity
public class Area implements Serializable {

    @Id
    private String name;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "areaName", referencedColumnName = "name", insertable = false, updatable = false)
    private List<AreaAccessAuthority> authorities;

}
