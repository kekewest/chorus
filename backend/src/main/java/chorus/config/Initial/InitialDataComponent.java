package chorus.config.Initial;

import java.io.IOException;

import javax.annotation.PostConstruct;

import chorus.config.properties.ChorusProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class InitialDataComponent {

    @Autowired
    private ChorusProperties chorusProperties;

    @Autowired
    private HomeDirectoryComponent homeDirectoryComponent;

    @Autowired
    private MasterDataComponent masterDataComponent;

    @Autowired
    private TestDataComponent testDataComponent;

    @PostConstruct
    private void init() throws IOException {
        homeDirectoryComponent.init();
        masterDataComponent.createMasterData();

        if (chorusProperties.isTestMode()) {
            testDataComponent.createTestData();
        }
    }

}
