package chorus.repository.security;

import org.springframework.data.jpa.repository.JpaRepository;

import chorus.domain.db.entity.security.AreaAccessAuthority;

public interface AreaAccessAuthorityRepository extends JpaRepository<AreaAccessAuthority, AreaAccessAuthority.PK> {

}
