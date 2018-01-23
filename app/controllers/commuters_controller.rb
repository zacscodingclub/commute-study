class CommutersController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_commuter, only: [:show, :edit, :update, :destroy]

  # GET /commuters
  # GET /commuters.json
  def index
    @homes = Home.all
    @destinations = Destination.all
  end

  # GET /commuters/1
  # GET /commuters/1.json
  def show
  end

  # GET /commuters/new
  def new
    @commuter = Commuter.new
  end

  # GET /commuters/1/edit
  def edit
  end

  # POST /commuters
  # POST /commuters.json
  def create
    @commuter = Commuter.create
    @commuter.create_home(
      address: commuter_params[:home][:address],
      lat: commuter_params[:home][:coordinates][:lat],
      lng: commuter_params[:home][:coordinates][:lng]
    )

    commuter_params[:destinations].map do |destination|
      @commuter.destinations.create(
        address: destination[:address],
        lat: destination[:coordinates][:lat],
        lng: destination[:coordinates][:lng],
        place_type: destination[:type],
        mode: destination[:mode]
      )
    end

    respond_to do |format|
      if @commuter.save
        format.html { redirect_to @commuter, notice: 'Commuter was successfully created.' }
        format.json { render :show, status: :created, location: @commuter }
      else
        format.html { render :new }
        format.json { render json: @commuter.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /commuters/1
  # PATCH/PUT /commuters/1.json
  def update
    respond_to do |format|
      if @commuter.update(commuter_params)
        format.html { redirect_to @commuter, notice: 'Commuter was successfully updated.' }
        format.json { render :show, status: :ok, location: @commuter }
      else
        format.html { render :edit }
        format.json { render json: @commuter.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /commuters/1
  # DELETE /commuters/1.json
  def destroy
    @commuter.destroy
    respond_to do |format|
      format.html { redirect_to commuters_url, notice: 'Commuter was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_commuter
      @commuter = Commuter.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def commuter_params
      params.
        fetch(:commuter, {}).
        permit(home:
          [:address, :coordinates => [:lat, :lng]],
          :destinations => [:address, :type, :mode, :coordinates => [ :lat, :lng ]]
        )
    end
end
