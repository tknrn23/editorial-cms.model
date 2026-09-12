import { securityMatrixTableGenerator } from '../src/security/security-matrix'
import * as fs from 'node:fs'

const table = securityMatrixTableGenerator()

const SEPARATOR = ';' // ';' for locale FR, ',' for locale US

fs.writeFileSync(__dirname + '/../.security-matrix.csv', table.map((row) => row.join(SEPARATOR)).join('\r\n'))
