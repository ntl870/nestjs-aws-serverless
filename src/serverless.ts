import { GenericHandler } from './common/GenericHandler';
import { CatModule } from './modules/cat/cat.module';
import { DogModule } from './modules/dog/dog.module';

export const dogHandler = new GenericHandler(DogModule).getHandler();

export const catHandler = new GenericHandler(CatModule).getHandler();
