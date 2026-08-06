import { FixturesData, GenerateFixtures } from '../src/command/generate-fixtures'

const generator = new GenerateFixtures()

const fixturesData: FixturesData = generator.generate()

console.log(JSON.stringify(fixturesData, null, 2))
