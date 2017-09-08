package chorus.repository.contents;

import java.util.List;

import chorus.domain.db.entity.contents.Sheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SheetRepository extends JpaRepository<Sheet, Long> {

    @Query("select s from Sheet s, AreaAccessAuthority a "
        + "where a.areaName = s.areaName "
        + "and a.userName = :userName "
        + "and a.areaName = :areaName "
        + "and s.id = :id")
    public Sheet findAllowedSheet(@Param("userName") String userName, @Param("areaName") String areaName, @Param("id") Long id);

    public List<Sheet> findByAreaNameAndParentSheetId(String areaName, Long parentSheetId);

}
