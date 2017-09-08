package chorus.repository.security;

import chorus.domain.db.entity.security.AreaAccessAuthority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AreaAccessAuthorityRepository extends JpaRepository<AreaAccessAuthority, AreaAccessAuthority.PK> {

}
