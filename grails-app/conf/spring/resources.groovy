import com.mchange.v2.c3p0.ComboPooledDataSource


// Place your Spring DSL code here
beans = {
    dataSource(ComboPooledDataSource) { bean ->
        bean.destroyMethod = 'close'

        //use grails' datasource configuration for connection user, password, driver and JDBC url
        user = grailsApplication.config.dataSource.username
        password = grailsApplication.config.dataSource.password
        driverClass = grailsApplication.config.dataSource.driverClassName
        jdbcUrl = grailsApplication.config.dataSource.url
        idleConnectionTestPeriod = 2 * 60 * 60 //2 hours
        testConnectionOnCheckin = true
    }
}
