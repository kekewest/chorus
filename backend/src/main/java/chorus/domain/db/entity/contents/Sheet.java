package chorus.domain.db.entity.contents;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.TableGenerator;
import javax.persistence.UniqueConstraint;

import chorus.domain.db.entity.Auditing;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;


@Entity
@Table(
    indexes = {
        @Index(name = "areaName", columnList = "areaName"),
        @Index(name = "parentSheetId", columnList = "parentSheetId")
    },
    uniqueConstraints = {
        @UniqueConstraint(columnNames = { "areaName", "parentSheetId", "name" })
    })
@EqualsAndHashCode(
    callSuper = false,
    exclude = { "area", "childSheets", "parentSheet" })
@ToString(exclude = { "area", "childSheets", "parentSheet" })
@Data
public class Sheet extends Auditing implements Serializable {

    public static final Long ROOT_ID = -1L;

    @Id
    @TableGenerator(name = "seqTable", table = "seq_table", pkColumnName = "seq_name", valueColumnName = "seq_value",
        pkColumnValue = "sheet", initialValue = -2)
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "seqTable")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String areaName;

    @Column(nullable = false)
    private Long parentSheetId;

    @Column(unique = true, nullable = false)
    private String persistenceLocation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "areaName", referencedColumnName = "name", insertable = false, updatable = false)
    private Area area;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "parentSheetId", referencedColumnName = "id", insertable = false, updatable = false)
    private List<Sheet> childSheets;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parentSheetId", referencedColumnName = "id", insertable = false, updatable = false)
    private Sheet parentSheet;

}
