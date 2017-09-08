package chorus.repository.config;

import org.springframework.data.jpa.repository.JpaRepository;

import chorus.domain.db.entity.system.ChorusVersion;

public interface ChorusVersionRepository extends JpaRepository<ChorusVersion, String> {

}
