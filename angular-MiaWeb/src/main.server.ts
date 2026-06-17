import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { App } from './app/components/root/app.component';
import { config } from './app/config/app.config.server';

const bootstrap = (context: BootstrapContext) => bootstrapApplication(App, config, context);

export default bootstrap;
