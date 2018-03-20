path = require('path')
fs = require('fs')
coffeescript = require('coffeescript')

SRCDIR = './src'
DISTDIR = './dist'


task('compile', "recompile all modules", ->
    for fname in fs.readdirSync(SRCDIR)
        srcfile = path.join(SRCDIR, fname)

        if fs.statSync(srcfile).isFile()
            console.log("Compiling #{fname} ...")

            {name, ext} = path.parse(fname)

            incode = fs.readFileSync(srcfile, 'utf8')

            outcode = coffeescript.compile(incode, {
                transpile: {presets: ['env']}
            })

            distfile = path.join(DISTDIR, name + '.js')

            fs.writeFileSync(distfile, outcode)
)
