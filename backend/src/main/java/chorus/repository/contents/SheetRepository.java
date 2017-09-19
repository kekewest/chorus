package chorus.repository.contents;

import java.util.List;

import chorus.domain.db.entity.contents.Sheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SheetRepository extends JpaRepository<Sheet, Long> {

    @Query("select s from Sheet s, AreaAccessAuthority a "
        + "where s.id = :id "
        + "and a.userName = :userName "
        + "and a.areaName = s.areaName ")
    public Sheet findAllowedSheet(@Param("userName") String userName, @Param("id") Long id);

    public List<Sheet> findByParentSheetId(Long parentSheetId);

}
