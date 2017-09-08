package chorus.repository.contents;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import chorus.domain.db.entity.contents.Sheet;

public interface SheetRepository extends JpaRepository<Sheet, Long> {

    public List<Sheet> findByAreaNameAndParentSheetId(String areaName, Long parentSheetId);

}
