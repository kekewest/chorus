package chorus.repository.security;

import org.springframework.data.jpa.repository.JpaRepository;

import chorus.domain.db.entity.security.User;

public interface UserRepository extends JpaRepository<User, String> {

}
