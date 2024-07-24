NOTE: If you are using precommit hooks thanks to something like `husky`,
you will need to name your script something other than "commit"
(e.g. "cm": "cz"). The reason is that **npm scripts has a "feature"
where it automatically runs scripts with the name `prexxx`**
where `xxx` is the name of another script. In essence, npm and husky will run
"precommit" scripts twice if you name the script "commit", and the workaround
is to prevent the npm-triggered precommit script.

[Source](http://commitizen.github.io/cz-cli/)
