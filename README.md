# Install

You'll need a decent version of Ruby (>2.0.0) for the database we used Postgres.

```sh
bundle
rake db:create
rake db:migrate
rails s
```

and point your browser to ```localhost:3000```.

# PhotoEditorSDK integration

For a very easy installation:

1. Copy the assets like stickers to ```public/imglykit```.
2. Copy the imglykit.js bundle to ```app/assets/javascripts```.
3. Copy the imglykit-night-ui.css to ```app/assets/stylesheets```.
4. Integrate the SDK as [documented](https://www.photoeditorsdk.com/documentation/html5/integration).

# Rails integration

The image will be posted as a DataURL (a base64-encoded string containing the pixel data). With rails the upload will look like this:

```ruby
def upload
  decodedImage = params[:data_url].split(',', 2)[1].unpack('m')[0]

  f = Tempfile.open('image', Rails.root.join('tmp') )
  f.binmode
  f.print(decodedImage)
  f.close

  @image = Image.create(file: f)
  render :json => { url: image_path(@image) }
end
```

Feel free to ask questions in the issues.
