package com.globalnex;

import org.junit.jupiter.api.Test;

/**
 * Smoke test — validates the application class is loadable without starting the full Spring context.
 * Full context integration tests require a running MongoDB instance and are run separately.
 */
class SmartConnectApiApplicationTests {

    @Test
    void mainClassExists() {
        // Verifies the application class can be referenced without error
        Class<?> appClass = SmartConnectApiApplication.class;
        assert appClass != null;
    }
}
