package chorus.repository.security;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import chorus.domain.db.entity.security.AreaAccessAuthority;

public interface AreaAccessAuthorityRepository extends JpaRepository<AreaAccessAuthority, AreaAccessAuthority.PK> {

    List<AreaAccessAuthority> findByUserName(String userName);

}
