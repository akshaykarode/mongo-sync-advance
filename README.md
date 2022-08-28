## Users
Setup Local
1. Install MongoDB tools. // https://www.mongodb.com/docs/database-tools/installation/installation-macos/
2. $ docker pull mongo:4.2
3. $ docker run --name MongoDB_4_2 -p 27017:27017 mongo // Run docker container with exposing PORT 27017
4. $ npm install
5. $ ./mongo-sync pull // Make sure to start VPN if required by remote database. 

> Ref : https://www.code4it.dev/blog/run-mongodb-on-docker

> Inspired by : https://github.com/sheharyarn/mongo-sync

=================================================================================

## Usage

- Download / Clone the script

    ```bash
    git clone https://github.com/akshaykarode/mongo-sync-advance.git
    cd mongo-sync-advance
    ```

- Edit `config.yml`, `specific_collections.yml` and as per your requirement

- Use the script like this:
	
	```bash
	./mongo-sync push [options]		# Push DB to Remote
	./mongo-sync pull [options]		# Pull DB to Local
	```
- Options

	```
	-y  # Skip confirmation
	--config alternate-config-file.yml
	```

## Notes

 - `mongo-sync` requires `mongodump` and `mongorestore` binaries to be installed in your system. If you have [`mongodb`](http://docs.mongodb.org/manual/tutorial/#getting-started) installed, then you probably already have them
 - Pushing/Pulling ***overwrites*** the Target DB
 - It's a good idea to keep your `config.yml` in `.gitignore` if you're using it inside some other project


## TODO

 - Add a `--no-overwrite` flag+feature that doesn't drop the target db before restoring it, and *actually* tries to sync it
 - Add a `backup` command and an `--auto-backup` feature
 - Add more options for Local DB in `config.yml`


## Contributing

1. [Fork it](https://github.com/akshaykarode/mongo-sync-advance/fork)
2. Create your feature/fix branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Create a new Pull Request


## License

Copyright (c) 2022 Akshay Karode

MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

