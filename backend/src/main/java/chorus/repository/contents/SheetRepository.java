package chorus.repository.contents;

import org.springframework.data.jpa.repository.JpaRepository;

import chorus.domain.db.entity.contents.Sheet;

public interface SheetRepository extends JpaRepository<Sheet, Long> {

}
