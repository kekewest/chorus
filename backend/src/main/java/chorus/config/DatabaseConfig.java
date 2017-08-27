package chorus.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import chorus.domain.db.node.EntityMarker;

@Configuration
@EntityScan(basePackageClasses = { EntityMarker.class, Jsr310JpaConverters.class })
public class DatabaseConfig {

}
