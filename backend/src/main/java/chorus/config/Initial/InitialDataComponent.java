package chorus.config.Initial;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import chorus.config.properties.ChorusProperties;

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
    private void init() {
        homeDirectoryComponent.init();
        masterDataComponent.createMasterData();

        if (chorusProperties.isTestMode()) {
            testDataComponent.createTestData();
        }
    }

}
